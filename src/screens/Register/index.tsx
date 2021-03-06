import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import uuid from 'react-native-uuid';
import { useForm } from 'react-hook-form'; 
import * as Yup from 'yup';
import  { yupResolver } from '@hookform/resolvers/yup';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

interface FormData {
    name: string;
    amount: string
}

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numerico')
    .positive('O valor não pode ser negativo')
});

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const dataKey = '@gofinances:transactions';

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category'
    });

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
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

    async function handleRegister(form: FormData) {
        if (!transactionType) return Alert.alert('Selecione o tipo da transação')

        if (category.key === 'category') return Alert.alert('Selecione a categoria')

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }

        try {
           const data = await AsyncStorage.getItem(dataKey);
           const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Category'
            });

            navigation.goBack();
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível salvar')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome" 
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        
                        <InputForm 
                            name="amount"
                            control={control}
                            placeholder="Preço" 
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}

                        />

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
                    <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
                </Form>
                

                <Modal visible={categoryModalOpen}>
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleClouseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>

    )
}