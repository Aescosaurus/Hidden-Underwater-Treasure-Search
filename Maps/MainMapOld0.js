function MainMap( gfx )
{
	this.Terrain =
	[
		new Terrain( gfx,Rect( -100,300,400,400 ) ),
		new Terrain( gfx,Rect( 300,550,500,200 ) )
	];
	this.Treasures =
	[
		new Treasure( gfx,450,450,10 ),
		new Treasure( gfx,540,450,10 ),
		new Treasure( gfx,630,450,10 )
	];
	this.Enemies =
	[
		new Fish( 450,200 )
	]
}

// function MainMap()
// {}
// 
// MainMap.Data = {
// 	Terrain:
// 	[
// 		new Terrain( Rect( -100,300,400,400 ) ),
// 		new Terrain( Rect( 300,550,500,200 ) )
// 	],
// 	Treasures:
// 	[
// 		new Treasure( 450,450,10 ),
// 		new Treasure( 540,450,10 ),
// 		new Treasure( 630,450,10 )
// 	],
// 	Enemies:
// 	[
// 		new Fish( 450,200 )
// 	]
// };