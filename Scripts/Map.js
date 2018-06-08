function Map()
{
	const terrain = [];
	const treasures = [];
	// 
	this.InitWorld=( worldArr,treasArr )=>
	{
		for( var i in worldArr )
		{
			terrain.push( worldArr[i] );
		}
		
		for( var i in treasArr )
		{
			treasures.push( treasArr[i] );
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
		
		for( var t in treasures )
		{
			if( treasures[t].WillRemove() )
			{
				treasures.splice( t,1 );
			}
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
	
	this.GetTerrainRects=()=>
	{
		const temp = [];
		
		for( var t in terrain )
		{
			temp.push( terrain[t].GetRect() );
		}
		
		return( temp );
	}
	
	this.GetTreasures=()=>
	{
		return( treasures );
	}
}