function Treasure( gfx,x,y,price )
{
	const GetImageFromPrice=()=>
	{
		switch( price )
		{
		case 10: return 0; break;
		case 20: return 1; break;
		case 50: return 2; break;
		default: return 0; break;
		}
	}
	// 
	Treasure.prototype.images =
	[
		gfx.LoadImage( "Images/Treasure1.png" ),
		gfx.LoadImage( "Images/Treasure2.png" ),
		gfx.LoadImage( "Images/Treasure3.png" )
	];
	const size = Vec2( 64,64 );
	const pos = Vec2( x,y - size.y / 2 );
	const val = price;
	let willDelete = false;
	const image = Treasure.prototype.images[GetImageFromPrice()];
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