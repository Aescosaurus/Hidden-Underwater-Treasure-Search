function Button( x,y,w,h,text = "BOP" )
{
	const pos = Vec2( x,y );
	const size = Vec2( w,h );
	let isDown = false;
	let canPress = false;
	let isHovering = false;
	// 
	this.Update=( ms )=>
	{
		isDown = ms.IsDown();
		isHovering = this.GetRect().Contains( ms.GetPos() );
		
		if( isHovering && !isDown ) canPress = true;
	}
	
	this.Draw=( gfx )=>
	{
		// TODO: Button image which stretches out.
		let col = "blue";
		if( isHovering ) col = "lightblue";
		gfx.DrawRect( pos,size,col );
		
		gfx.DrawText( pos.GetAdded( Vec2( 5,15 ) ),
			"15PX Lucida Console","white",text );
	}
	
	this.IsPressed=()=>
	{
		return( canPress && isDown );
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
}

function Menu( gfx,sfx )
{
	const start = new Button( 50,150,80,20,"Start" );
	// 
	this.Update=( ms )=>
	{
		start.Update( ms );
	}
	
	this.Draw=( gfx )=>
	{
		start.Draw( gfx );
	}
	
	this.WillStart=()=>
	{
		return( start.IsPressed() );
	}
}