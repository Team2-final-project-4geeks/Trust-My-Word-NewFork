"""empty message

Revision ID: fc8d8f185622
Revises: ab212f3ca02b
Create Date: 2023-08-06 14:45:18.450048

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'fc8d8f185622'
down_revision = 'ab212f3ca02b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.Enum('activity', 'product', 'trip', name='myenum'), nullable=True))
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(length=200),
               nullable=False)
        batch_op.drop_column('status')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', postgresql.ENUM('activity', 'product', 'trip', name='myenum'), autoincrement=False, nullable=True))
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(length=200),
               nullable=True)
        batch_op.drop_column('category')

    # ### end Alembic commands ###
