function Treasure( gfx,x,y,price )
{
	Treasure.prototype.images =
	[
		"Images/Treasure1.png"
	];
	const size = Vec2( 64,64 );
	const pos = Vec2( x,y - size.y / 2 );
	const val = price;
	let willDelete = false;
	// TODO: Determine image from price.
	const image = gfx.LoadImage( Treasure.prototype
		.images[Math.floor( price / 10 ) - 1] );
	// 
	this.Update=( moveAmount )=>
	{
		pos.Add( moveAmount );
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawRect( pos,size,"gold" );
		gfx.DrawImage( image,pos,size );
	}
	
	this.Collect=()=>
	{
		willDelete = true;
		
		return( val );
	}
	
	this.Reset=()=>
	{
		pos.x = x;
		pos.y = y;
		willDelete = false;
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y + size.y / 2,
			size.x,size.y / 2 ) );
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