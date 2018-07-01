function ParallaxHandler( gfx )
{
	const img = gfx.LoadImage( "Images/Background.png" );
	// 
	this.Draw=( moveAmount,gfx )=>
	{
		gfx.DrawImage( img,
			Vec2( moveAmount.x * 1.2,moveAmount.y * 1.02 ),
			gfx.ScreenSize );
	}
}