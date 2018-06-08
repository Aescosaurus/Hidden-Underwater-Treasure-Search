function Treasure( x,y,price )
{
	const pos = Vec2( x,y );
	const size = Vec2( 32,32 );
	const val = price;
	let willDelete = false;
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
		gfx.DrawRect( pos,size,"gold" );
	}
	
	this.Collect=()=>
	{
		willDelete = true;
		
		return( val );
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
	
	this.GetVal=()=>
	{
		return( val );
	}
	
	this.WillRemove=()=>
	{
		return( willDelete );
	}
}