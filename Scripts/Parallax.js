function ParallaxHandler( gfx )
{
	const img1 = gfx.LoadImage( "Images/Background1.png" );
	const move = Vec2( 700.0 / 6500.0,700.0 / 4500.0 );
	// 
	this.Draw=( moveAmount,gfx )=>
	{
		gfx.DrawImage( img1,
			Vec2( moveAmount.x * move.x,moveAmount.y * move.y ),
			Vec2( gfx.ScreenWidth * 2,gfx.ScreenHeight * 2 ) );
	}
}