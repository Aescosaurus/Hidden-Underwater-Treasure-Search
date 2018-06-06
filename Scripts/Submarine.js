function Submarine( x,y )
{
	const ctrls = {
		Up: 'W',
		Down: 'S',
		Left: 'A',
		Right: 'D'
	};
	const pos = Vec2( x,y );
	const vel = Vec2( 0,0 );
	const size = Vec2( 32,32 );
	const slowdown = 0.95;
	const maxSpeed = 5.1;
	// 
	this.Update=( kbd )=>
	{
		if( kbd.KeyDown( ctrls.Up ) ) --vel.y;
		if( kbd.KeyDown( ctrls.Down ) ) ++vel.y;
		if( kbd.KeyDown( ctrls.Left ) ) --vel.x;
		if( kbd.KeyDown( ctrls.Right ) ) ++vel.x;
		
		if( vel.x > maxSpeed ) vel.x = maxSpeed;
		if( vel.y > maxSpeed ) vel.y = maxSpeed;
		if( vel.x < -maxSpeed ) vel.x = -maxSpeed;
		if( vel.y < -maxSpeed ) vel.y = -maxSpeed;
		
		if( vel.y < 0.0 ) vel.y += 0.2;
		
		pos.Add( vel );
		vel.Multiply( slowdown );
	}
	
	this.Draw=( gfx )=>
	{
		gfx.DrawRect( pos,size,"red" );
	}
}