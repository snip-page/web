CREATE TABLE IF NOT EXISTS snips (
	id CHAR(10) NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	text VARCHAR(100000) NOT NULL,
	public BOOLEAN NOT NULL,
	created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
