function Treasure( x,y,price )
{
	const pos = Vec2( x,y );
	// TODO: Determine image from price.
	let image = 0;
	// 
	this.Update=( moveAmount )=>
	{
		pos.Add( moveAmount );
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawImage( image,pos );
		gfx.DrawRect( pos,Vec2( 32,32 ),"gold" );
	}
}