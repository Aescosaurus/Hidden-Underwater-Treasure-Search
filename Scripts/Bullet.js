function Bullet( x,y,target )
{
	const speed = 4.3;
	const pos = Vec2( x,y );
	const vel = pos.GetSubtracted( target ).GetNormalized()
		.GetMultiplied( -speed );
	const size = Vec2( 16,16 );
	let dead = false;
	// 
	this.Update=( moveAmount )=>
	{
		pos.Add( vel );
		pos.Add( moveAmount );
	}
	
	this.Draw=( gfx )=>
	{
		gfx.DrawRect( pos
			.GetSubtracted( size.GetDivided( 2 ) ),
			size,"red" );
		
		if( !this.GetRect()
			.Overlaps( gfx.ScreenRect ) )
		{
			dead = true;
		}
	}
	
	this.Kill=()=>
	{
		dead = true;
	}
	
	this.GetPos=()=>
	{
		return( pos.Clone() );
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x - size.x / 2,
			pos.y - size.y / 2,
			size.x,size.y ) );
	}
	
	this.WillKill=()=>
	{
		return( dead );
	}
}