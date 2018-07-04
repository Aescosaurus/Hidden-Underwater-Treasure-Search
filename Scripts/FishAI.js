function FishAI()
{}

FishAI.Stay = function()
{
	// Do nothing, you just stay XD.
	this.Go=( pos,moveAmount,playerPos,gfx )=>
	{
		
	}
}

FishAI.Float = function()
{
	this.Go=( pos,moveAmount,playerPos,gfx )=>
	{
		const dist = 4;
		const temp = Vec2( Random.Range( -dist,dist ),
			Random.Range( -dist,dist ) );
		pos.Add( temp );
	}
}

FishAI.Patrol = function( speed = 2,dist = 70 )
{
	const spd = speed;
	const moveDist = dist;
	let startPos = Vec2( -9999,-9999 );
	let dir = -1;
	this.Go=( pos,moveAmount,playerPos,gfx )=>
	{
		startPos.Add( moveAmount );
		if( startPos.Equals( Vec2( -9999,-9999 ) ) )
		{
			startPos = pos.Clone();
		}
		
		pos.x += dir * spd;
		
		if( pos.x > startPos.x + moveDist ) dir = -1;
		else if( pos.x < startPos.x - moveDist ) dir = 1;
	}
	
	this.GetVel=()=> { return( Vec2( dir,0 ) ); }
}

FishAI.Shoot = function( bulletVec,gfx )
{
	const refireTimer = new Timer( 72.4 );
	// 
	this.Go=( pos,moveAmount,playerPos,gfx )=>
	{
		refireTimer.Update();
		
		if( refireTimer.IsDone() && gfx.ScreenRect.Contains( pos ) )
		{
			refireTimer.Reset();
			
			bulletVec.push( new Bullet( pos.x,pos.y,
				playerPos,gfx ) );
		}
	}
}

FishAI.Follow = function()
{
	const speed = 10;
	// 
	this.Go=( pos,moveAmount,playerPos,gfx )=>
	{
		if( gfx.ScreenRect.Contains( pos ) )
		{
			const diff = playerPos.GetSubtracted( pos );
			
			pos.Add( diff.GetNormalized() * speed );
		}
	}
}