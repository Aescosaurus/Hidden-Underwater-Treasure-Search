function Submarine( x,y,shop,comboHand,scoreManager,gfx )
{
	const ReverseVel=()=>
	{
		moveAmount.Subtract( vel
			.GetMultiplied( 3 ) );
		
		vel.Multiply( -1 );
	}
	const GetRange=()=>
	{
		return( maxRange * shop.RangeAdd() + 60 );
	}
	const GetMaxSpeed=()=>
	{
		return( maxMaxSpeed * shop.SpeedAdd() + 4 );
	}
	const GetVel=()=>
	{
		return( 0.7 + maxVel * shop.SpeedAdd() );
	}
	const GetMaxFuel=()=>
	{
		return( maxMaxFuel * shop.FuelAdd()
			/*500 * shop.SpeedAdd()*/ );
	}
	// 
	const ctrls = {
		Up: 'W',
		Down: 'S',
		Left: 'A',
		Right: 'D'
	};
	const size = Vec2( 32,32 );
	const pos = Vec2( gfx.ScreenWidth,gfx.ScreenHeight )
		.GetDivided( 2 ).GetSubtracted( size );
	const moveAmount = Vec2( 0,0 );
	const vel = Vec2( 0,0 );
	const slowdown = 0.95;
	const maxMaxSpeed = 6.5;
	const maxVel = 0.7;
	const invul = new Timer( 62 );
	let isInvul = false;
	const hpBar = new HealthBar( 5,Vec2( 5,5 ) );
	// const image = gfx.LoadImage( "Images/Sub1.png" );
	const anim = new Anim( "Images/Sub",1,4,12,gfx );
	const hurtAnim = new Anim( "Images/SubHurt",1,2,4,gfx );
	const torpedoTimer = new Timer( 24.4,true );
	const range = 100;
	const maxRange = 350;
	let maxFuel = 150;
	const maxMaxFuel = 1350;
	const fuelBar = new HealthBar( GetMaxFuel(),Vec2( 5,35 ) );
	// 
	this.Update=( kbd )=>
	{
		if( this.HasToSurface() )
		{
			const surfaceSpeed = 8;
			pos.y -= surfaceSpeed;
			vel.Set( 0,0 );
			moveAmount.Add( Vec2( 0,-surfaceSpeed ) );
			hurtAnim.Reset();
		}
		
		const vv = GetVel();
		if( kbd.KeyDown( ctrls.Up ) ) vel.y -= vv;
		if( kbd.KeyDown( ctrls.Down ) ) vel.y += vv;
		if( kbd.KeyDown( ctrls.Left ) ) vel.x -= vv;
		if( kbd.KeyDown( ctrls.Right ) ) vel.x += vv;
		
		const maxSpeed = GetMaxSpeed();
		if( vel.x > maxSpeed ) vel.x = maxSpeed;
		if( vel.y > maxSpeed ) vel.y = maxSpeed;
		if( vel.x < -maxSpeed ) vel.x = -maxSpeed;
		if( vel.y < -maxSpeed ) vel.y = -maxSpeed;
		
		if( vel.y < 0.0 ) vel.y += 0.2;
		// pos.Add( vel );
		moveAmount.Add( vel );
		vel.Multiply( slowdown );
		
		if( isInvul )
		{
			hurtAnim.Update();
			invul.Update();
			
			if( invul.IsDone() )
			{
				invul.Reset();
				isInvul = false;
			}
		}
		else hurtAnim.Reset();
		
		const curSpd = vel.GetLengthSq() / 50.0;
		if( curSpd != 0 )
		{
			anim.Update( curSpd );
			
			fuelBar.LoseHP( curSpd );
		}
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawCircle( pos,range / 2,"orange" );
		// gfx.DrawRect( pos,size,"red" );
		gfx.DrawHollowCircle( pos,GetRange(),"white" );
		if( isInvul )
		{
			// gfx.DrawRect( pos
			// 	.GetSubtracted( size.GetDivided( 2 ) ),
			// 	size,"blue" );
			hurtAnim.Draw( pos
				.GetSubtracted( size.GetDivided( 2 ) ),
				size,gfx );
		}
		else
		{
			// gfx.DrawImage( image,pos
			// 		.GetSubtracted( size.GetDivided( 2 ) ),
			// 		size );
			anim.Draw( pos
				.GetSubtracted( size.GetDivided( 2 ) ),
				size,gfx );
		}
		
		hpBar.Draw( 100,20,gfx );
		fuelBar.Draw( 100,20,gfx,"#FFA214" );
	}
	
	this.CheckGroundHits=( groundArr )=>
	{
		let hitGround = false;
		const hitbox = this.GetRect();
		for( var i in groundArr )
		{
			const curGround = groundArr[i];
			
			if( curGround.Overlaps( hitbox ) )
			{
				ReverseVel();
				
				hitGround = true;
				break;
			}
		}
		
		if( hitGround ) this.Hurt( 1 );
		
		return( hitGround );
	}
	
	this.CheckTreasureHits=( treasures )=>
	{
		let score = 0;
		
		const hitbox = this.GetRect();
		
		for( var i in treasures )
		{
			const curTreasure = treasures[i];
			
			if( curTreasure.GetRect().Overlaps( hitbox ) )
			{
				scoreManager.AddScore( curTreasure.GetVal() * 10 );
				comboHand.AddAndRefresh();
				
				score += curTreasure.Collect();
			}
		}
		
		return( score );
	}
	
	this.CheckEnemyHits=( enemies )=>
	{
		let hasHit = false;
		
		for( var i in enemies )
		{
			const e = enemies[i];
			const hitbox = this.GetRect();
			
			while( e.GetRect().Overlaps( this.GetRect() ) )
			{
				const delta = e.GetPos()
					.GetSubtracted( pos )
					.GetNormalized();
				
				pos.Subtract( delta );
			}
			if( e.GetRect().Overlaps( hitbox ) )
			{
				ReverseVel();
				hasHit = true;
				break;
			}
		}
		
		if( hasHit )
		{
			this.Hurt( 1 );
		}
		
		return( hasHit );
	}
	
	this.DoTorpedoStuff=( torpedoVec,enemies )=>
	{
		torpedoTimer.Update();
		
		if( torpedoTimer.IsDone() )
		{
			// Reset makes it so you dont loop through
			//  every enemy like 9999 times a sec.
			torpedoTimer.Reset();
			
			for( var en in enemies )
			{
				const e = enemies[en];
				// console.log( e.GetPos().GetSubtracted( pos ).GetLength() + "{|}" + range );
				
				if( e.GetPos().GetSubtracted( pos )
					.GetLengthSq() <
					GetRange() * GetRange() + 64 * 64 &&
					e.IsOnScreen( gfx ) )
				{
					torpedoVec.push( new Torpedo( pos.x,pos.y,gfx ) );
					
					break;
				}
			}
		}
	}
	
	this.ResetDelta=()=>
	{
		moveAmount.x = 0.0;
		moveAmount.y = 0.0;
	}
	
	this.Hurt=( amount )=>
	{
		if( !isInvul )
		{
			hpBar.LoseHP( amount );
			isInvul = true;
			
			comboHand.Reset();
		}
	}
	
	this.MoveAwayFrom=( thePos )=>
	{
		ReverseVel();
	}
	
	this.Reset=()=>
	{
		// Need to reset pos bc pos is high after surfacing.
		pos.x = gfx.ScreenWidth / 2 - size.x;
		pos.y = gfx.ScreenHeight / 2 - size.y;
		vel.Set( 0,0 );
		invul.Reset();
		isInvul = false;
		hpBar.Reset();
		fuelBar.SetMax( GetMaxFuel() );
		fuelBar.Reset();
		torpedoTimer.Reset();
	}
	
	this.UpgradeSpeed=()=>
	{
		slowdown += 0.05;
		maxSpeed += 0.4;
	}
	
	this.UpgradeRange=()=>
	{
		const rangeAdd = 40;
		range += rangeAdd;
	}
	
	this.GetDelta=()=>
	{
		return( moveAmount.GetMultiplied( -1 ) );
	}
	
	this.GetPos=()=>
	{
		return( pos.Clone() );
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x - size.x / 2,
			pos.y - size.y / 2,
			size.x,size.y ) );
	}
	
	this.HasToSurface=()=>
	{
		return( hpBar.GetHP() < 1 || fuelBar.GetHP() < 1 );
	}
}