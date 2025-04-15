import { CheckSquare } from 'lucide-react'
import {TagList} from "../../../components/molecules/TagList";

export const NoteDetailsPanel = () => {
    const tags = ['ideas', 'to-do’s', 'morning']
    const checklist = [
        { label: 'setup meeting with Rachel', done: true },
        { label: 'apply at Braintree', done: false },
        { label: 'check to-dos', done: false },
        { label: 'check reservations', done: true },
    ]

    return (
        <div className="w-[400px] flex-1 h-full bg-white px-10 py-8 overflow-auto border-l">
            <div className="w-full flex justify-center mb-6">
                <img
                    src="https://illustrations.popsy.co/gray/web-design.svg"
                    alt="Decor"
                    className="w-72 h-auto"
                />
            </div>

            <h1 className="text-2xl font-bold text-black mb-2">Write down your ideas 💡</h1>

            <div className="mb-4">
                <TagList tags={tags} />
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                “Sometimes, on Mondays, when servers at A16 are announcing the specials, you can almost feel
                the excitement at the table when the waiters say, ‘And of course, since it’s Monday ... we have
                meatballs.’” says Shelley Lingren.
            </p>

            {/* Checklist */}
            <div>
                <h3 className="text-md font-semibold mb-2">Morning</h3>
                <ul className="space-y-2">
                    {checklist.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
              <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      item.done ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300'
                  }`}
              >
                {item.done && <CheckSquare size={12} className="text-white" />}
              </span>
                            <span className={item.done ? 'line-through text-gray-400' : 'text-gray-700'}>
                {item.label}
              </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
