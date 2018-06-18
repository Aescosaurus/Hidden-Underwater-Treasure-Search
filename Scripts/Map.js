function Map()
{
	const terrain = [];
	const treasures = [];
	const enemies = [];
	// 
	this.InitWorld=( gfx,bullets )=>
	{
		const mm = new MainMap( gfx,bullets );
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
	
	this.Update=( playerPos,gfx,torpedoes )=>
	{
		for( var e in enemies )
		{
			enemies[e].Update( playerPos,gfx );
			
			for( var tp in torpedoes )
			{
				if( torpedoes[tp].GetRect()
					.Overlaps( enemies[e].GetRect() ) )
				{
					enemies[e].Hurt( 1 );
					torpedoes[tp].Kill();
				}
			}
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
	
	this.MoveAll=( amount )=>
	{
		for( var ter in terrain )
		{
			terrain[ter].Update( amount );
		}
		
		for( var tr in treasures )
		{
			treasures[tr].Update( amount );
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
			enemies[e].MoveBy( amount );
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
	
	this.GetClosestEnemy=( target )=>
	{
		// console.clear();
		let shortest = 99999999;
		let toReturn = 0;
		for( var en in enemies )
		{
			const e = enemies[en];
			
			const dist = e.GetPos().GetSubtracted( target )
				.GetLengthSq();
			
			// console.log( Math.sqrt( dist ) );
			
			if( dist < shortest )
			{
				console.log( Math.sqrt( dist ) );
				console.log( e.GetPos().GetSubtracted( target ) );
				shortest = dist;
				toReturn = en;
			}
		}
		
		return( enemies[toReturn] );
	}
}