function Torpedo( x,y )
{
	const speed = 5;
	const size = Vec2( 16,16 );
	const pos = Vec2( x,y );
	let vel = Vec2( 0,0 );
	// 
	this.Update=()=>
	{
		pos.Add( vel );
	}
	
	this.Draw=( gfx )=>
	{
		gfx.DrawRect( pos
			.GetSubtracted( size.GetDivided( 2 ) ),
			size,"orange" );
	}
	
	this.MoveBy=( amount )=>
	{
		pos.Add( amount );
	}
	
	this.Target=( targetLoc )=>
	{
		vel = pos.GetSubtracted( targetLoc )
			.GetNormalized().GetMultiplied( speed );
	}
}