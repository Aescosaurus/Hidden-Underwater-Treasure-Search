function HealthBar( maxHP,startPos )
{
	const max = maxHP;
	let curHP = maxHP;
	// 
	this.Draw=( width,height,gfx,color = "red" )=>
	{
		if( curHP > 0 )
		{
			gfx.DrawRect( startPos,
				Vec2( ( curHP / maxHP ) * width,height ),
				color );
		}
	}
	
	this.LoseHP=( amount )=>
	{
		curHP -= amount;
	}
	
	this.GetHP=()=>
	{
		return( curHP );
	}
}