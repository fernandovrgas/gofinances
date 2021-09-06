import React, { useState } from 'react';
import { Modal } from 'react-native';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category'
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleOpenSelectCateogoryModal(){
        setCategoryModalOpen(true)
    }

    function handleClouseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />

                    <TransactionTypes>
                        <TransactionTypeButton 
                            onPress={() => handleTransactionTypeSelect('up')} 
                            type="up" 
                            title="Income" 
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            onPress={() => handleTransactionTypeSelect('down')} 
                            type="down" 
                            title="Outcome" 
                            isActive={transactionType === 'down'}
                        />
                    </TransactionTypes>

                    <CategorySelectButton 
                        onPress={handleOpenSelectCateogoryModal} 
                        title={category.name} 
                    />
                </Fields>
                <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleClouseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}