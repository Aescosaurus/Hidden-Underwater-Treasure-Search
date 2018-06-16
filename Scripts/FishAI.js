function FishAI()
{}

FishAI.Stay = function()
{
	// Do nothing, you just stay XD.
	this.Go=( pos,moveAmount,playerPos )=>
	{
		
	}
}

FishAI.Float = function()
{
	this.Go=( pos,moveAmount,playerPos )=>
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
	this.Go=( pos,moveAmount,playerPos )=>
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
}

FishAI.Shoot = function( bulletVec )
{
	const refireTimer = new Timer( 72.4 );
	// 
	this.Go=( pos,moveAmount,playerPos )=>
	{
		refireTimer.Update();
		
		if( refireTimer.IsDone() )
		{
			refireTimer.Reset();
			
			bulletVec.push( new Bullet( pos.x + 32,pos.y + 32,playerPos ) );
		}
	}
}