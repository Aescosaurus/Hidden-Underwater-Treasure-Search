function Map()
{
	const terrain = [];
	const treasures = [];
	const enemies = [];
	// 
	this.InitWorld=( gfx )=>
	{
		const mm = new MainMap( gfx );
		const worldArr = mm.Terrain;
		const treasArr = mm.Treasures;
		const enemyArr = mm.Enemies;
		
		for( var w in worldArr )
		{
			terrain.push( worldArr[w] );
		}
		
		for( var t in treasArr )
		{
			treasures.push( treasArr[t] );
		}
		
		for( var e in enemyArr )
		{
			enemies.push( enemyArr[e] );
		}
	}
	
	this.Update=( moveAmount )=>
	{
		for( var ter in terrain )
		{
			terrain[ter].Update( moveAmount );
		}
		
		for( var tr in treasures )
		{
			treasures[tr].Update( moveAmount );
		}
		
		// TODO: Optimize this somehow.
		for( var t in treasures )
		{
			if( treasures[t].WillRemove() )
			{
				treasures.splice( t,1 );
			}
		}
		
		for( var e in enemies )
		{
			enemies[e].Update();
			
			enemies[e].MoveBy( moveAmount );
		}
	}
	
	this.Draw=( gfx )=>
	{
		for( var ter in terrain )
		{
			terrain[ter].Draw( gfx );
		}
		
		for( var tr in treasures )
		{
			treasures[tr].Draw( gfx );
		}
		
		for( var e in enemies )
		{
			enemies[e].Draw( gfx );
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
	
	this.GetEnemies=()=>
	{
		return( enemies );
	}
}