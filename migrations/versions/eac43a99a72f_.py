"""empty message

Revision ID: eac43a99a72f
Revises: 
Create Date: 2023-09-29 20:59:00.905253

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eac43a99a72f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shipping_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('userFirstName', sa.String(length=250), nullable=True),
    sa.Column('userLastName', sa.String(length=250), nullable=True),
    sa.Column('country', sa.String(length=250), nullable=True),
    sa.Column('zipCode', sa.Integer(), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('bicycles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price_id', sa.String(length=100), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bicycles', schema=None) as batch_op:
        batch_op.drop_column('price_id')

    op.drop_table('shipping_data')
    # ### end Alembic commands ###