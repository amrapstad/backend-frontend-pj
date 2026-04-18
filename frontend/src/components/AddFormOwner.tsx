'use client';
import * as React from 'react';
import { useState, useEffect } from 'react'
import { Field } from '@base-ui/react/field';
import { Button } from '@base-ui/react/button';
import { Combobox } from '@base-ui/react/combobox'
import { Form } from '@base-ui/react/form';
import styles from '../css/addform.module.css';
import fieldStyles from '../css/addform.module.css';
import comboboxStyles from '../css/combobox.module.css';
import submitButtonStyles from '../css/other.module.css';


export default function AddFormOwner({ isNew }: { isNew: boolean }) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([])
    const [searchKeyword, setSearchKeyword] = useState("");
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleOwnerSearchDebounced(searchKeyword);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchKeyword]);

    async function handleOwnerSearchDebounced(keyword: string) {
        setErrors({})
        setLoading(true)
        try {
            const url = keyword
                ? `/api/owners/search/debounced?keyword=${encodeURIComponent(keyword)}`
                : `/api/owners/search/debounced`
            const res = await fetch(url)
            if (!res.ok) {
                setErrors({ server: await res.text() });
                setItems([]);
                return
            }
            setItems(await res.json())
        } catch (err: any) {
            setErrors({ server: err.message || 'An error occurred' });
        }
        finally { setLoading(false) }
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setLoading(true);
        setErrors({});

        try {
            const rRes = await fetch('/api/owners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ownerName: formData.get('owner_name'),
                    email: formData.get('email'),
                })
            });
            if (!rRes.ok) throw new Error(await rRes.text() || 'Failed to create owner');

            alert("Success!");
        } catch (err: any) {
            setErrors({ server: err.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {isNew ? (
                <>
                    <h3>Owner</h3>
                    <Form onSubmit={handleSubmit} errors={errors}>
                        <Field.Root name="owner_name" className={styles.Field}>
                            <Field.Label className={styles.Label}>Owner name</Field.Label>
                            <Field.Control
                                type="text"
                                required
                                defaultValue=""
                                placeholder="Owner name"
                                className={styles.Input}
                            />
                            <Field.Error className={styles.Error} />
                        </Field.Root>
                        <Field.Root name="email" className={styles.Field}>
                            <Field.Label className={styles.Label}>Email</Field.Label>
                            <Field.Control
                                type="text"
                                required
                                defaultValue=""
                                placeholder="Email"
                                className={styles.Input}
                            />
                            <Field.Error className={styles.Error} />
                        </Field.Root>
                        <Button type="submit" disabled={loading} focusableWhenDisabled className={submitButtonStyles.Button_Custome}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                </>
            ) : (
                <>
                    <Field.Root name="owner_email" className={fieldStyles.Field}>
                        <Field.Label className={comboboxStyles.Label}>Owner email</Field.Label>
                        <Combobox.Root
                            onInputValueChange={(value: string) => setSearchKeyword(value)}
                        >
                            <Field.Control render={(props) => (
                                <Combobox.Input
                                    {...props}
                                    type="text"
                                    required
                                    placeholder="Search for an existing owner..."
                                    className={fieldStyles.Input}
                                />
                            )} />
                            <Combobox.Portal>
                                <Combobox.Positioner sideOffset={4}>
                                    <Combobox.Popup className={comboboxStyles.Popup}>
                                        <Combobox.List className={comboboxStyles.List}>
                                            {items.length === 0 && !loading && searchKeyword && (
                                                <Combobox.Empty className={comboboxStyles.Empty}>No owners found.</Combobox.Empty>
                                            )}
                                            {items.map((item) => (
                                                <Combobox.Item key={item.id} value={item.email} className={comboboxStyles.Item}>
                                                    {item.email}
                                                </Combobox.Item>
                                            ))}
                                        </Combobox.List>
                                    </Combobox.Popup>
                                </Combobox.Positioner>
                            </Combobox.Portal>
                        </Combobox.Root>
                        <Field.Error className={fieldStyles.Error} />
                    </Field.Root>
                </>
            )}
        </>
    );
}
