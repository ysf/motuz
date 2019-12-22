"""empty message

Revision ID: 881811805554
Revises: 1035b06e75e0
Create Date: 2019-12-21 16:45:04.180704

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '881811805554'
down_revision = '1035b06e75e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('revoked_token',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('jti', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('identity', sa.String(), nullable=False),
    sa.Column('exp', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('jti')
    )
    op.drop_table('invalid_token')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('invalid_token',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('token', sa.VARCHAR(length=500), autoincrement=False, nullable=False),
    sa.Column('blacklisted_on', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='invalid_token_pkey'),
    sa.UniqueConstraint('token', name='invalid_token_token_key')
    )
    op.drop_table('revoked_token')
    # ### end Alembic commands ###