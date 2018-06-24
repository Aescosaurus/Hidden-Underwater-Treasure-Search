function Anim( name,first,last,fps,gfx )
{
	const Start=()=>
	{
		for( var i = first; i <= last; ++i )
		{
			images.push( gfx.LoadImage( name + i + ".png" ) );
		}
	}
	// 
	const images = [];
	Start();
	let spot = 0;
	const updateAmount = fps / 30.0;
	// const max = loopSecs * 30;
	// 
	this.Update=( amount = updateAmount )=>
	{
		spot += amount;
		
		if( spot >= images.length ) spot = 0.0;
	}
	
	this.Draw=( pos,size,gfx )=>
	{
		gfx.DrawImage( images[Math.floor( spot )],pos,size );
	}
}