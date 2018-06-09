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