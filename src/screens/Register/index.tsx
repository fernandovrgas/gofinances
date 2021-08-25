import React, { useState } from 'react';

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

export function Register() {
    const [transactionType, setTransactionType] = useState('')

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
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
                </Fields>
                <Button title="Enviar" />
            </Form>
        </Container>
    )
}