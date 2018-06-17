// Pls don't initialize this directly.
function Enemy( x,y,ai,imgNum )
{
	const myImg = imgNum;
	const size = Vec2( 64,64 );
	const pos = Vec2( x,y );
	const myAI = ai;
	let moveAmount = Vec2( 0,0 );
	// 
	this.Update=( playerPos,gfx )=>
	{
		ai.Go( pos,moveAmount,playerPos,gfx );
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawRect( pos,size,"red" );
		gfx.DrawImage( myImg,pos,size );
	}
	
	this.MoveBy=( amount )=>
	{
		moveAmount = amount;
		pos.Add( amount );
	}
	
	this.GetPos=()=>{ return( pos.Clone() ); }
	this.GetRect=()=>
	{
		return( Rect( pos.x,pos.y,size.x,size.y ) );
	}
}

function Fish( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Patrol(),gfx.LoadImage( "Images/Enemy.png" ) );
}

function Squid( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Shoot( bullets ),gfx.LoadImage( "Images/Enemy.png" ) );
}