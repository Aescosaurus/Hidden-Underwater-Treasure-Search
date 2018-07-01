function Torpedo( x,y,gfx )
{
	const speed = 5;
	const size = Vec2( 16,16 );
	const pos = Vec2( x,y );
	let vel = Vec2( 0,0 );
	const armTimer = new Timer( 15 );
	let dead = false;
	const spin = new Anim( "Images/Torpedo",1,4,16,gfx );
	// 
	this.Update=()=>
	{
		if( armTimer.IsDone() )
		{
			pos.Add( vel );
			spin.Update();
		}
		else
		{
			armTimer.Update();
			pos.Add( vel.GetPerp() );
		}
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawRect( pos
		// 	.GetSubtracted( size.GetDivided( 2 ) ),
		// 	size,"orange" );
		spin.Draw( pos
			.GetSubtracted( size.GetDivided( 2 ) ),
			size,gfx );
		
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