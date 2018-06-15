function MainMap( gfx )
{
	this.Terrain =
	[
		new Terrain( gfx,Rect( -288,64,288,544 ) ),
		new Terrain( gfx,Rect( 0,320,320,288 ) ),
		new Terrain( gfx,Rect( 320,448,224,512 ) ),
		new Terrain( gfx,Rect( 544,800,608,160 ) ),
	];
	this.Treasures =
	[
		new Treasure( gfx,784,768,10 ),
		new Treasure( gfx,848,768,10 ),
		new Treasure( gfx,912,768,10 ),
	];
	this.Enemies =
	[
		new Fish( 832,640 ),
	]
};
