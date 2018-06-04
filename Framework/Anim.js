// Call with sprite sheet being gfx.LoadImage( "spriteSheetURL.png" );
function Anim( x,y,width,height,count,spriteSheet,fps )
{
	const Init=()=>
	{
		for( let i = 0; i < count; ++i )
		{
			const left = x + i * width;
			const right = x + ( i + 1 ) * width;
			const top = y;
			const bot = y + height;
			frames.push( Rect( left,top,
				( right - left ),( bot - top ) ) );
		}
	}
	
	const Advance=()=>
	{
		if( ++iCurFrame >= Math.floor( frames.length ) )
		{
			iCurFrame = 0;
		}
	}
	// 
	const sheet = spriteSheet;
	const holdTime = 1.0 / fps;
	let frames = [];
	let iCurFrame = 0;
	let curFrameTime = 0.0;
	Init();
	// 
	this.Update=( dt )=>
	{
		curFrameTime += dt;
		while( curFrameTime >= holdTime )
		{
			Advance();
			curFrameTime -= holdTime;
		}
	}
	
	this.Draw=( pos,gfx )=>
	{
		gfx.DrawImageClip( spriteSheet,pos,
			frames[iCurFrame],
			Vec2( width,height ) );
	}
	
	return( this );
}