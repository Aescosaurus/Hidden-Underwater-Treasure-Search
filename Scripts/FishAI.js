function FishAI()
{}

FishAI.Stay = function()
{
	// Do nothing, you just stay XD.
	this.Go=( pos )=>
	{
		
	}
}

FishAI.Float = function()
{
	this.Go=( pos )=>
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
	this.Go=( pos,moveAmount )=>
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