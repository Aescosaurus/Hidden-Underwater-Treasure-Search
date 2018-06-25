function MainMap( gfx,bulletVec )
{
	this.Terrain =
	[
		new Terrain( gfx,Rect( -32,64,224,320 ) ),
		new Terrain( gfx,Rect( -32,384,672,160 ) ),
		new Terrain( gfx,Rect( 640,864,576,128 ) ),
		new Terrain( gfx,Rect( 1632,-64,352,352 ) ),
		new Terrain( gfx,Rect( 448,1280,1440,160 ) ),
		new Terrain( gfx,Rect( -192,-32,384,96 ) ),
		new Terrain( gfx,Rect( 1504,288,352,704 ) ),
		new Terrain( gfx,Rect( 1888,1376,256,224 ) ),
		new Terrain( gfx,Rect( 1856,896,256,224 ) ),
		new Terrain( gfx,Rect( 448,992,192,288 ) ),
		new Terrain( gfx,Rect( 448,544,192,448 ) ),
		new Terrain( gfx,Rect( 2144,1472,288,256 ) ),
		new Terrain( gfx,Rect( 2112,992,288,256 ) ),
		new Terrain( gfx,Rect( 2432,1568,224,640 ) ),
		new Terrain( gfx,Rect( 2400,1088,288,256 ) ),
		new Terrain( gfx,Rect( 2688,1216,256,192 ) ),
		new Terrain( gfx,Rect( 2944,1216,160,608 ) ),
		new Terrain( gfx,Rect( 4384,3104,864,224 ) ),
		new Terrain( gfx,Rect( 5248,1824,192,1440 ) ),
		new Terrain( gfx,Rect( 4896,2016,352,64 ) ),
		new Terrain( gfx,Rect( 4320,1696,1120,128 ) ),
		new Terrain( gfx,Rect( 4288,2528,224,576 ) ),
		new Terrain( gfx,Rect( 3808,2368,608,160 ) ),
		new Terrain( gfx,Rect( 2656,2048,768,160 ) ),
		new Terrain( gfx,Rect( 3296,2208,672,160 ) ),
		new Terrain( gfx,Rect( 3712,1760,608,128 ) ),
		new Terrain( gfx,Rect( 3104,1696,608,128 ) ),
	];
	this.Treasures =
	[
		new Treasure( gfx,880,832,10 ),
		new Treasure( gfx,960,832,10 ),
		new Treasure( gfx,1040,832,10 ),
		new Treasure( gfx,656,1248,10 ),
		new Treasure( gfx,2464,1536,10 ),
		new Treasure( gfx,3232,2016,20 ),
		new Treasure( gfx,3296,2016,20 ),
		new Treasure( gfx,3360,2016,20 ),
		new Treasure( gfx,4160,2336,20 ),
		new Treasure( gfx,4224,2336,20 ),
		new Treasure( gfx,4768,3072,50 ),
		new Treasure( gfx,4832,3072,50 ),
		new Treasure( gfx,4896,3072,50 ),
		new Treasure( gfx,5168,1984,50 ),
	];
	this.Enemies =
	[
		new Fish( 1360,1088,bulletVec,gfx ),
		new Fish( 2672,1456,bulletVec,gfx ),
		new Fish( 3280,1904,bulletVec,gfx ),
		new Squid( 4208,2128,bulletVec,gfx ),
		new Fish( 4816,2944,bulletVec,gfx ),
		new Squid( 4592,2896,bulletVec,gfx ),
		new Squid( 4896,2752,bulletVec,gfx ),
	]
};
