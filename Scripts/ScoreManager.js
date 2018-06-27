function ScoreManager( comboHandler )
{
	let score = 0;
	// 
	this.AddScore=( amount )=>
	{
		score += amount * comboHandler.GetScoreMult();
	}
	
	this.Reset=()=> { score = 0; };
	
	this.GetScore=()=> { return( score ); }
}