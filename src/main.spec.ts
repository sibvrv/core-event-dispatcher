import {DispatchEvent, EventDispatcher} from './main';
import {expect} from 'chai';

describe('Event Dispatcher Basic Tests', function () {
  it('allows only function as listener', () => {
    const dispatcher = new EventDispatcher();
    expect(() => {
      dispatcher.on('event', null!);
    }).to.throw(/must be a function/);
  });

  it('calls listener', () => {
    const dispatcher = new EventDispatcher();

    const callsResult: any[] = [];
    dispatcher.on('event', (event: DispatchEvent, ...args: any[]) => {
      callsResult.push(args);
    });

    dispatcher.dispatch('event'); // test 0
    dispatcher.dispatch('event', 'test 1', 1);
    dispatcher.dispatch('event', 'test 2', 2, 3);
    dispatcher.dispatch('event', 'test 3', 4, 5, 6);
    dispatcher.dispatch('event', 'test 4', 7, 8, 9, 10);

    expect(callsResult).deep.equal([
      [],
      ['test 1', 1],
      ['test 2', 2, 3],
      ['test 3', 4, 5, 6],
      ['test 4', 7, 8, 9, 10]
    ]);
  });

  it('removes event on no listeners', () => {
    const dispatcher = new EventDispatcher();
    const unbind1 = dispatcher.on('one', () => {
    });
    const unbind2 = dispatcher.on('one', () => {
    });

    expect(dispatcher['__events']['one']).to.length(2);

    unbind1();
    expect(dispatcher['__events']['one']).to.length(1);

    unbind1();
    expect(dispatcher['__events']['one']).to.length(1);

    unbind2();
    expect(dispatcher['__events']).deep.equal({});

    unbind2();
    expect(dispatcher['__events']).deep.equal({});
  });

  it('removes listener during event', () => {
    const dispatcher = new EventDispatcher();

    const callsResult: any[] = [];
    const unbind1 = dispatcher.on('event', () => {
      unbind1();
      callsResult.push(1);
    });

    const unbind2 = dispatcher.on('event', () => {
      unbind1();
      unbind2();
      callsResult.push(2);
    });

    dispatcher.dispatch('event');
    expect(callsResult).deep.equal([1, 2]);
    expect(dispatcher['__events']).deep.equal({});
  });

  it('allows to use arrow function to bind a context', () => {
    const dispatcher = new EventDispatcher();

    const demo = {
      value: 'test',
      check: [] as string[],
      getListener() {
        return () => {
          this.check = this.value.split('');
        };
      }
    };

    dispatcher.on('event', demo.getListener());

    expect(() => {
      dispatcher.dispatch('event');
    }).not.throw();

    expect(demo.check).deep.equal(['t', 'e', 's', 't']);
  });
});
