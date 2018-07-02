function ParallaxHandler( gfx )
{
	const img1 = gfx.LoadImage( "Images/Background1.png" );
	const img2 = gfx.LoadImage( "Images/Background2.png" );
	// 
	this.Draw=( moveAmount,gfx )=>
	{
		return;
		gfx.DrawImage( img1,
			Vec2( moveAmount.x * 0.02,moveAmount.y * 0.01 ),
			gfx.ScreenSize.GetMultiplied( 2 ) );
		gfx.DrawImage( img2,
			Vec2( moveAmount.x * 1.2,moveAmount.y * 0.01 ),
			Vec2( gfx.ScreenWidth * 4,gfx.ScreenHeight * 2 ) );
	}
}