function Torpedo( x,y )
{
	const speed = 5;
	const size = Vec2( 16,16 );
	const pos = Vec2( x,y );
	let vel = Vec2( 0,0 );
	const armTimer = new Timer( 25 );
	let dead = false;
	// 
	this.Update=()=>
	{
		if( armTimer.IsDone() )
		{
			pos.Add( vel );
		}
		else
		{
			armTimer.Update();
			pos.Add( vel.GetPerp() );
		}
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
			.GetNormalized().GetMultiplied( -speed );
	}
	
	this.Kill=()=>
	{
		dead = true;
	}
	
	this.GetPos=()=>
	{
		return( pos );
	}
	
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
	
	this.IsDead=()=>
	{
		return( dead );
	}
}