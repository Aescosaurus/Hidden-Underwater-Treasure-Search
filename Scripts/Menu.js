function Button( x,y,w,h,text = "BOP" )
{
	const pos = Vec2( x,y );
	const size = Vec2( w,h );
	let isDown = false;
	let canPress = false;
	// 
	this.Update=( ms )=>
	{
		isDown = ms.IsDown();
		if( this.GetRect().Contains( ms.GetPos() ) )
		{
			if( !isDown ) canPress = true;
		}
	}
	
	this.Draw=( gfx )=>
	{
		// TODO: Button image which stretches out.
		gfx.DrawRect( pos,size,"blue" );
		
		gfx.DrawText( pos.GetAdded( 20 ),
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
	const start = new Button( )
	// 
	this.Update=( ms )=>
	{
		
	}
	
	this.Draw=( gfx )=>
	{
		
	}
}