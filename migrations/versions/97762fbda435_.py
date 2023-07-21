"""empty message

Revision ID: 97762fbda435
Revises: e0526672deca
Create Date: 2023-07-21 16:10:26.830678

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '97762fbda435'
down_revision = 'e0526672deca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('type', sa.String(length=120), nullable=False),    
    sa.Column('author_name', sa.String(length=200), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('location', sa.String(length=250), nullable=False),
    sa.Column('publishing_date', sa.String(length=8), nullable=False),
    sa.Column('link', sa.String(length=300), nullable=False),
    sa.Column('price_range', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('activities')
    # ### end Alembic commands ###
