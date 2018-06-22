function Button( x,y,colorTransformer,text = "BOP",fontSize = 15 )
{
	const pos = Vec2( x,y );
	const size = Vec2( text.length * fontSize * ( 2 / 3 ),fontSize + 5 );
	let isDown = false;
	let canPress = false;
	let isHovering = false;
	let pressed = false;
	const colors = colorTransformer.GetButtonColors();
	// 
	this.Update=( ms )=>
	{
		// if( isHovering && !isDown ) canPress = true;
		// if( isDown && canPress ) canPress = false;
		
		isDown = ms.IsDown();
		isHovering = this.GetRect().Contains( ms.GetPos() );
		
		if( isHovering && !isDown ) canPress = true;
		else if( !isHovering ) canPress = false;
		
		// if( isHovering && isDown && canPress )
		// {
		// 	pressed = true;
		// }
		// 
		// if( isDown && !isHovering )
		// {
		// 	
		// }
	}
	
	this.Draw=( gfx )=>
	{
		// TODO: Button image which stretches out.
		let col = colors[0];
		if( isHovering ) col = colors[1];
		gfx.DrawRect( pos,size,col );
		
		gfx.DrawText( pos.GetAdded( Vec2( 5,fontSize - fontSize / 7 ) ),
			fontSize + "PX Lucida Console","white",text );
	}
	
	this.IsPressed=()=>
	{
		return( isHovering && isDown && canPress )
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
}

function ImageButton( x,y,w,h,image1,image2 )
{
	// Button.call( this,x,y );
	const myRect = Rect( x,y,w,h );
	let isDown = false;
	let isHovering = false;
	let canPress = false;
	// 
	this.Update=( ms )=>
	{
		isDown = ms.IsDown();
		isHovering = myRect.Contains( ms.GetPos() );
		
		if( isHovering && !isDown ) canPress = true;
		else if( !isHovering ) canPress = false;
	}
	
	this.Draw=( gfx )=>
	{
		let temp = image1;
		if( isHovering ) temp = image2;
		gfx.DrawImage( temp,Vec2( x,y ),Vec2( w,h ) );
	}
	
	this.IsPressed=()=>
	{
		return( isHovering && isDown && canPress );
	}
}

function Menu( gfx,sfx,ct )
{
	const start = new Button( 70,150,ct,"Start",55 );
	// const options = new Button( 50,240,"Options",35 );
	let pauseMenu = false;
	const resume = new Button( 70,150,ct,"Resume",45 );
	// 
	this.Update=( ms )=>
	{
		if( !pauseMenu )
		{
			start.Update( ms );
			// options.Update( ms );
		}
		else
		{
			resume.Update( ms );
		}
	}
	
	this.Draw=( gfx )=>
	{
		if( !pauseMenu )
		{
			gfx.DrawText( Vec2( 50,100 ),"75PX Lucida Console",
				"white","Diving Game" );
			start.Draw( gfx );
			// options.Draw( gfx );
		}
		else
		{
			gfx.DrawText( Vec2( 50,100 ),"65PX Lucida Console",
				"white","Paused" );
			resume.Draw( gfx );
		}
	}
	
	this.WillStart=()=>
	{
		return( start.IsPressed() );
	}
	
	this.WillResume=()=>
	{
		return( resume.IsPressed() );
	}
	
	this.Pause=( pausedOrNot )=>
	{
		pauseMenu = pausedOrNot;
	}
}