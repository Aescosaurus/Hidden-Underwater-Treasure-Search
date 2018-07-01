function ParallaxHandler( gfx )
{
	const img = gfx.LoadImage( "Images/Background.png" );
	// 
	this.Draw=( moveAmount,gfx )=>
	{
		gfx.DrawImage( img,
			Vec2( moveAmount.x * 0.02,moveAmount.y * 0.01 ),
			gfx.ScreenSize );
	}
}