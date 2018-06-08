function Terrain( area )
{
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
		// gfx.DrawImage( image,pos );
		gfx.DrawRect( pos,size,"gray" );
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
}