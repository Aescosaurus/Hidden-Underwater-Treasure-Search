"use strict";

(function()
{
const gfx = new Graphics();
const kbd = new Keyboard();
const ms = new Mouse();
const sfx = new Sound();

const sub = new Submarine( 60,60,gfx );
const world = new Map();
const ct = new ColorTransformer();

let gold = 0;
let moveAmount = Vec2( 0,0 );

window.onload = function()
{
	Start();
	const fps = 30;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / fps );
}

function Start()
{
	kbd.Start();
	ms.Start( gfx.GetCanvas() );
	gfx.Start();
	// Initialize below!
	world.InitWorld( gfx );
}

function Update()
{
	// Update below.
	sub.Update( kbd );
	
	moveAmount.Add( sub.GetDelta() );
	
	world.Update( sub.GetDelta() );
	
	if( sub.CheckGroundHits( world.GetTerrainRects() ) )
	{
		world.Update( sub.GetDelta() );
	}
	
	if( sub.CheckEnemyHits( world.GetEnemies() ) )
	{
		world.Update( sub.GetDelta() );
	}
	
	sub.ResetDelta();
	
	gold += sub.CheckTreasureHits( world.GetTreasures() );
	
	if( kbd.KeyDown( ' ' ) )
	{
		sub.Hurt( 999 );
	}
}

function Draw()
{
	gfx.DrawRect( Vec2( 0,0 ),gfx.ScreenSize,ct.Transform( "#269" ) );
	gfx.DrawRect( Vec2( 0,moveAmount.y )
		.GetSubtracted( Vec2( 0,gfx.ScreenHeight ) ),
		gfx.ScreenSize,ct.Transform( "#48A" ) );
	// Draw below.
	world.Draw( gfx );
	sub.Draw( gfx );
	
	gfx.DrawText( Vec2( 115,25 ),"25PX Lucida Console",
		"gold",gold );
	
	// for( var i in world.GetTerrainRects() )
	// {
	// 	const x = world.GetTerrainRects()[i];
	// 	gfx.DrawRect( Vec2( x.x,x.y ),
	// 		Vec2( x.width,x.height ),"orange" );
	// }
}
})();