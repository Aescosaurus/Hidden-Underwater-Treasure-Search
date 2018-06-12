function Timer( time )
{
	const maxTime = time;
	let curTime = 0.0;
	// 
	this.Update=()=> { ++curTime; }
	this.Reset=()=> { curTime = 0.0; }
	this.IsDone=()=> { return( curTime >= maxTime ); }
}