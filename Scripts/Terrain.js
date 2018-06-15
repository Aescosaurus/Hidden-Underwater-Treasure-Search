function Terrain( gfx,area,level = 1 )
{
	Terrain.prototype.images =
	[
		gfx.LoadImage( "Images/Tile1.png" )
	];
	Terrain.prototype.tileSize = 16;
	const pos = Vec2( area.x,area.y );
	const size = Vec2( area.width,area.height );
	// TODO: Calculate image to use based on dims.
	// const image = img;
	// 
	this.Update=( moveAmount )=>
	{
		pos.Add( moveAmount );
	}
	
	this.Draw=( gfx )=>
	{
		gfx.DrawRect( pos,size,"gray" );
		
		const tS = Terrain.prototype.tileSize;
		for( let y = pos.y; y < pos.y + size.y - tS; y += tS * 2 )
		{
			for( let x = pos.x; x < pos.x + size.x - tS; x += tS * 2 )
			{
				gfx.DrawImage( Terrain.prototype.images[level - 1],
					Vec2( x,y ),Vec2( tS * 2,tS * 2 )  );
			}
		}
		// for( let y = pos.y;
		// 	y < pos.y + size.y;
		// 	pos.y += Terrain.prototype.tileSize )
		// {
		// 	for( let x = pos.x;
		// 		x < pos.x + size.x;
		// 		x += Terrain.prototype.tileSize )
		// 	{
		// 		gfx.DrawImage( Terrain.prototype.images[level - 1],
		// 			Vec2( x,y ),Terrain.prototype.size );
		// 		
		// 		console.log( x + " " + y );
		// 	}
		// }
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
}