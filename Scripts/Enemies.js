// Pls don't initialize this directly.
function Enemy( x,y,ai,imgNum,health )
{
	const myImg = imgNum;
	const size = Vec2( 64,64 );
	const pos = Vec2( x,y );
	const myAI = ai;
	let moveAmount = Vec2( 0,0 );
	let hp = health;
	// 
	this.Update=( playerPos,gfx )=>
	{
		ai.Go( pos,moveAmount,playerPos,gfx );
	}
	
	this.Draw=( gfx )=>
	{
		// gfx.DrawRect( pos,size,"red" );
		gfx.DrawImage( myImg,
			pos.GetSubtracted( size.GetDivided( 2 ) ),
			size );
	}
	
	this.MoveBy=( amount )=>
	{
		moveAmount = amount;
		pos.Add( amount );
	}
	
	this.Hurt=( amount )=>
	{
		hp -= amount;
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
}

function Fish( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Patrol(),gfx.LoadImage( "Images/Enemy.png" ),14 );
}

function Squid( x,y,bullets,gfx )
{
	Enemy.call( this,x,y,new FishAI.Shoot( bullets ),gfx.LoadImage( "Images/Enemy.png" ),10 );
}