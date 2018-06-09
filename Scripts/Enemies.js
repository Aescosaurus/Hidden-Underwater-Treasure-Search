// Pls don't initialize this directly.
function Enemy( x,y,ai )
{
	const size = Vec2( 64,64 );
	const pos = Vec2( x,y );
	const myAI = ai;
	// 
	this.Update=()=>
	{
		ai.Go( pos );
	}
	
	this.Draw=( gfx )=>
	{
		gfx.DrawRect( pos,size,"red" );
	}
	
	this.MoveBy=( amount )=>
	{
		pos.Add( amount );
	}
	
	this.GetPos=()=>{ return( pos ); }
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
}

function Fish( x,y )
{
	Enemy.call( this,x,y,new FishAI.Float() );
}