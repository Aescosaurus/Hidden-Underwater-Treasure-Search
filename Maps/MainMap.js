function MainMap()
{}

MainMap.Data = {
	Terrain:
	[
		new Terrain( Rect( -100,300,400,400 ) ),
		new Terrain( Rect( 300,550,500,200 ) )
	],
	Treasures:
	[
		new Treasure( 450,450,10 ),
		new Treasure( 500,450,10 ),
		new Treasure( 550,450,10 )
	],
	Enemies:
	[
		new Fish( 450,200 )
	]
};