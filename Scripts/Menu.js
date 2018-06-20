function Button( x,y,text = "BOP",fontSize = 15 )
{
	const pos = Vec2( x,y );
	const size = Vec2( text.length * fontSize * ( 2 / 3 ),fontSize + 5 );
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
		
		gfx.DrawText( pos.GetAdded( Vec2( 5,fontSize - fontSize / 7 ) ),
			fontSize + "PX Lucida Console","white",text );
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
	const start = new Button( 50,150,"Start",55 );
	const options = new Button( 50,240,"Options",35 );
	// 
	this.Update=( ms )=>
	{
		start.Update( ms );
		options.Update( ms );
	}
	
	this.Draw=( gfx )=>
	{
		start.Draw( gfx );
		options.Draw( gfx );
	}
	
	this.WillStart=()=>
	{
		return( start.IsPressed() );
	}
}