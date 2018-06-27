function Timer( time,finished = false )
{
	const maxTime = time;
	let curTime = ( finished ? time : 0.0 );
	// 
	this.Update=()=> { ++curTime; }
	this.Reset=()=> { curTime = 0.0; }
	this.IsDone=()=> { return( curTime >= maxTime ); }
}