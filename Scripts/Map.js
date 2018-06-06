function Map()
{
	const terrain = [];
	const treasures = [];
	// 
	this.InitWorld=( worldArr )=>
	{
		for( var i in worldArr )
		{
			terrain.push( worldArr[i] );
		}
	}
	
	this.Update=( moveAmount )=>
	{
		for( var t in terrain )
		{
			terrain[t].Update( moveAmount );
		}
		
		for( var t in treasures )
		{
			treasures[t].Update( moveAmount );
		}
	}
	
	this.Draw=( gfx )=>
	{
		for( var t in terrain )
		{
			terrain[t].Draw( gfx );
		}
		
		for( var t in treasures )
		{
			treasures[t].Draw( gfx );
		}
	}
}