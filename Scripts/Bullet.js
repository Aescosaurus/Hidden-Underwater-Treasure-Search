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
		gfx.DrawRect( pos,size,"red" );
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
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
	
	this.WillKill=()=>
	{
		return( dead );
	}
}