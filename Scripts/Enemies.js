// Pls don't initialize this directly.
function Enemy( x,y,ai,imgNum,health,val )
{
	const myImg = imgNum;
	const size = Vec2( 32,32 );
	const pos = Vec2( x,y );
	const myAI = ai;
	let moveAmount = Vec2( 0,0 );
	let hp = health;
	// 
	this.Update=( playerPos,gfx )=>
	{
		ai.Go( pos,moveAmount,playerPos,gfx );
	}
	
	this.Update2=()=> { return; }
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawRect( pos,size,"red" );
		gfx.DrawImage( myImg,
			pos.GetSubtracted( size.GetDivided( 2 ) ),
			size );
		// const r = this.GetRect();
		// gfx.DrawRect( Vec2( r.x,r.y ),
		// 	Vec2( r.width,r.height ),"#0F0" );
	}
	
	this.Draw2=( gfx )=> { return; }
	
	this.MoveBy=( amount )=>
	{
		moveAmount = amount;
		pos.Add( amount );
	}
	
	this.Hurt=( amount )=>
	{
		hp -= amount;
	}
	
	this.GetPos=()=> { return( pos.Clone() ); }
	
	this.GetSize=()=> { return( size.Clone() ); }
	
	this.GetRect=()=>
	{
		return( Rect( pos.x - size.x / 2,
			pos.y - size.y / 2,
			size.x,size.y ).GetExpanded( -size.x / 4 ) );
	}
	
	this.IsOnScreen=( gfx )=>
	{
		return( this.GetRect().Overlaps( gfx.ScreenRect ) );
	}
	
	this.IsDead=()=>
	{
		return( hp < 1 );
	}
	
	this.GetPrice=()=>
	{
		return( val );
	}
}

function Fish( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Patrol(),
		gfx.LoadImage( "Images/Blank.png" ),5,30 );
	const anim = new Anim( "Images/Enemy",1,3,8,gfx );
	// 
	this.Update2=()=>
	{
		anim.Update();
	}
	
	this.Draw2=( gfx )=>
	{
		anim.Draw( this.GetPos().GetSubtracted( this
			.GetSize() ),
			this.GetSize().GetMultiplied( 2 ),gfx );
	}
}

function Squid( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Shoot( bullets,gfx ),
		gfx.LoadImage( "Images/EyeBase.png" ),3,20 );
	const anim = new Anim( "Images/EyeDecor",1,1,12,gfx );
	// This is kinda like an overload, but is really
	//  reassigning the property.
	this.Update2=()=>
	{
		anim.Update();
	}
	
	this.Draw2=( gfx )=>
	{
		anim.Draw( this.GetPos().GetSubtracted( this
			.GetSize() ),
			this.GetSize().GetMultiplied( 2 ),gfx );
	}
}

function Jelly( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Follow(),
		gfx.LoadImage( "Images/Enemy.png" ),4,15 );
}